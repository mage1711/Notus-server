import { Request, Response, Router } from 'express'
import { isEmpty } from 'class-validator'
import { getRepository } from 'typeorm'

import User from '../models/User'
import Sub from '../models/Sub'
import authentication from '../services/authentication'
import loggedIn from "../services/loggedIn"
import Post from '../models/Post'
const router = Router()
router.post('/', authentication, async (req: Request, res: Response) => {
  const { name, title, description } = req.body

  const user: User = res.locals.user

  try {
    let errors: any = {}
    if (isEmpty(name)) errors.name = 'Name must not be empty'
    if (isEmpty(title)) errors.title = 'Title must not be empty'

    const sub = await getRepository(Sub)
      .createQueryBuilder('sub')
      .where('lower(sub.name) = :name', { name: name.toLowerCase() })
      .getOne()

    if (sub) errors.name = 'Sub exists already'

    if (Object.keys(errors).length > 0) {
      throw errors
    }
  } catch (err) {
    return res.status(400).json(err)
  }

  try {
    const sub = new Sub({ name, description, title, user })
    await sub.save()

    return res.json(sub)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

router.get('/:name', loggedIn, async (req: Request, res: Response) => {

  const name = req.params.name

  try {
    const sub = await Sub.findOneOrFail({ name })
    const posts = await Post.find({
      where: { sub },
      order: { createdAt: 'DESC' },
      relations: ['comments', 'votes'],
    })

    sub.posts = posts

    if (res.locals.user) {
      sub.posts.forEach((p) => p.setUserVote(res.locals.user))
    }

    return res.json(sub)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ sub: 'Sub not found' })
  }
})

router.get('/search/:name', loggedIn, async (req: Request, res: Response) => {
  try {
    const name = req.params.name

    if (isEmpty(name)) {
      return res.status(400).json({ error: 'Name must not be empty' })
    }

    // reactJS , reactjs
    const subs = await getRepository(Sub)
      .createQueryBuilder()
      // react => rea
      .where('LOWER(name) LIKE :name', {
        name: `${name.toLowerCase().trim()}%`,
      })
      .getMany()

    return res.json(subs)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

export { router as subs }