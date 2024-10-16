const mongoUri= 


const connectDb = async () => {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  console.log('Connected to MongoDB');
}
module.exports = connectDb;