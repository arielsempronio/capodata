using {potest_metadata as external} from './external/potest_metadata.csn';

service CatalogService {
    @cds.autoexpose
    entity PurchaseOrderSet as projection on external.PurchaseOrderSet 

}