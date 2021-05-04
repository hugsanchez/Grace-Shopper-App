// const db= require('./db')
// const Products= require('./Products')


// const syncAndSeed=async()=>{
//     try{
//        await db.authenticate()
//        console.log('database connected')
//        await db.sync({force: true})
//     //    const monaLisa= Products.create({name:'Mona Lisa', description:'art', price:100000.00, year: 1900, imgURL: '#' })
//     //    await PromonaLisa.save()
//         const products = await Promise.all([
//             Products.create({name:'Mona Lisa', description:'art', price:100000.00, year: 1900, imgURL: '#' })
//         ])
//         const [monaLisa]= products
//     }
//     catch(err){
//         console.log(err)
//     }
// }

// module.exports = {
//     syncAndSeed,
//     Products
// }