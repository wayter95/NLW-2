import express from 'express';
import db from './database/connection';
import convertHourToMinute from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string,
}

routes.get("/", (request, response) => {
  return response.json({
    message: "Api Inicialized",
  });
});

routes.post('/classes', async (request, response) => {
  const {
    name, avatar, whatsapp, bio, subject, cost, schedule
  } = request.body;

  const trx = await db.transaction();

  try {
    const insertedUsersIds = await trx('users').insert({
      name, avatar, whatsapp, bio
    })

    const user_id = insertedUsersIds[0];

    const insertedClassesId = await trx('classes').insert({
      subject, cost, user_id
    })

    const class_id = insertedClassesId[0];

    const clasSchedules = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinute(scheduleItem.from),
        to: convertHourToMinute(scheduleItem.to)
      };
    })

    await trx('classes_schedule').insert(clasSchedules);

    await trx.commit();

    return response.status(201).send();
  } catch (err) {

    await trx.rollback();
    
    return response.status(400).json({
      message: 'Unexpected error while creating new classes'
    })
  }
})
export default routes;