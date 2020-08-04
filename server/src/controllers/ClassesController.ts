import { Request, Response } from "express";
import convertHourToMinute from "../utils/convertHourToMinutes";
import db from "../database/connection";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      response.status(400).send({
        message: "Missing filters to search classes",
      });
    }
    const timeinMinutes = convertHourToMinute(time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("classes_schedule.*")
          .from("classes_schedule")
          .whereRaw("`classes_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`classes_schedule`.`week_day` = ?? ", [Number(week_day)])
          .whereRaw("`classes_schedule`.`from`<= ??", [timeinMinutes])
          .whereRaw("`classes_schedule`.`to` > ??", [timeinMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return response.json(classes);
  }
  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesId = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesId[0];

      const clasSchedules = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinute(scheduleItem.from),
          to: convertHourToMinute(scheduleItem.to),
        };
      });

      await trx("classes_schedule").insert(clasSchedules);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        message: "Unexpected error while creating new classes",
      });
    }
  }
}
