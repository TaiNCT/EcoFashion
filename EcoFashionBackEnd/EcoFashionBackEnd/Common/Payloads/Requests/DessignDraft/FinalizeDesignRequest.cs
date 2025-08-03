namespace EcoFashionBackEnd.Common.Payloads.Requests.DessignDraft
{
    public class FinalizeDesignRequest
    {
        public int DesignId { get; set; }
        public List<DesignMaterialRequest> Materials { get; set; }
        public List<int> FeatureIds { get; set; }

        public float TotalCarbon { get; set; }
        public float TotalWater { get; set; }
        public float TotalWaste { get; set; }
    }
}
