import mongoose from 'mongoose'

export const connectToDatabase = async () => {
    mongoose
        .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
        .then(() => {
            console.log('db connected!')
        })
        .catch((e) => {
            console.log('Error connecting to db', e)
        })
}
