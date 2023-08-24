const cds = require('@sap/cds')
module.exports = async (srv) => {
    const potest_metadata = await cds.connect.to('potest_metadata')
    const { PurchaseOrderSet } = srv.entities

    srv.on(['READ'], PurchaseOrderSet, async (req) => {
        console.log("READ Event running...")
        
        let PerPersonalQuery = SELECT.from(req.query.SELECT.from)
        .limit(req.query.SELECT.limit)
    if (req.query.SELECT.where) {
        PerPersonalQuery.where(req.query.SELECT.where)
    }
    if (req.query.SELECT.orderBy) {
        PerPersonalQuery.orderBy(req.query.SELECT.orderBy)
    }

    let personal = await potest_metadata.tx(req).send({
        query: PerPersonalQuery
    })

        let PurchaseOrders = []
        if (Array.isArray(personal)){
            PurchaseOrders = personal
        }else {
            PurchaseOrders[0] = personal 
        }

        console.log(PurchaseOrders)
        return PurchaseOrders
    })
}