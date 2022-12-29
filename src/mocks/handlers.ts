import { rest } from 'msw'
import contacts from './contact/ok.json'
import transferCompleted from './transfer/ok.completed.json'
import transferPending from './transfer/ok.pending.json'

const host = 'http://localhost:3000' 

export const handlers = [
    rest.get(`${host}/contact`, (req, res, ctx) => {
        console.log(req)
        return res(ctx.status(200), ctx.delay(1000), ctx.json(contacts))
    }),
    rest.get(`${host}/contact/:username`, (req, res, ctx) => {
        console.log('red', req.params)
        const contact = contacts.find(c => c.username === req.params.username)
        if(!!contact){
            return res(ctx.status(200), ctx.delay(1000), ctx.json(contact))
        }else{
            return res(ctx.status(404), ctx.delay(1000), ctx.json({}))
        }
    }),
    rest.post(`${host}/auth/token`, async (req, res, ctx) => {
        const data = await req.json()
        const responseStatus = (data.token === '123456')? 200 : 422
        return res(ctx.status(responseStatus), ctx.delay(1000), ctx.json({}))
    }),
    rest.post(`${host}/transfer`, async (req, res, ctx) => { 
        const data = await req.json()
        let transfer = (data?.amount && data.amount >= 1000)? transferPending : transferCompleted;
        const response = {
            ...transfer,
            ...data, 
            response_date: new Date(Date.now())
        }
        res(ctx.status(200), ctx.delay(1000), ctx.json(response))
    }),
]