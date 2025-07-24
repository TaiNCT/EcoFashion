using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Seeders
{
    public static class MaterialTypeBenchmarkSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.MaterialTypesBenchmarks.AnyAsync()) return;
            var materialTypes = await context.MaterialTypes.ToListAsync();
            var sustainabilityCriterias = await context.SustainabilityCriterias.ToListAsync();
            if (materialTypes.Count < 8 || sustainabilityCriterias.Count < 3)
            {
                throw new Exception($"Seed error: Need at least 8 material types and 3 sustainability criteria. Found {materialTypes.Count} material types and {sustainabilityCriterias.Count} sustainability criteria.");
            }
            var materialTypeBenchmarks = new List<MaterialTypeBenchmark>
            {
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[0].TypeId,
                    CriteriaId = sustainabilityCriterias[0].CriterionId,
                    Value = 1.2m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[0].TypeId,
                    CriteriaId = sustainabilityCriterias[1].CriterionId,
                    Value = 2.3m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[0].TypeId,
                    CriteriaId = sustainabilityCriterias[2].CriterionId,
                    Value = 1.5m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[1].TypeId,
                    CriteriaId = sustainabilityCriterias[0].CriterionId,
                    Value = 2.2m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[1].TypeId,
                    CriteriaId = sustainabilityCriterias[1].CriterionId,
                    Value = 1.8m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[1].TypeId,
                    CriteriaId = sustainabilityCriterias[2].CriterionId,
                    Value = 2.9m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[2].TypeId,
                    CriteriaId = sustainabilityCriterias[0].CriterionId,
                    Value = 2.1m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[2].TypeId,
                    CriteriaId = sustainabilityCriterias[1].CriterionId,
                    Value = 3.2m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[2].TypeId,
                    CriteriaId = sustainabilityCriterias[2].CriterionId,
                    Value = 1.1m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[3].TypeId,
                    CriteriaId = sustainabilityCriterias[0].CriterionId,
                    Value = 1.9m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[3].TypeId,
                    CriteriaId = sustainabilityCriterias[1].CriterionId,
                    Value = 2.5m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[3].TypeId,
                    CriteriaId = sustainabilityCriterias[2].CriterionId,
                    Value = 1.7m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[4].TypeId,
                    CriteriaId = sustainabilityCriterias[0].CriterionId,
                    Value = 2.0m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[4].TypeId,
                    CriteriaId = sustainabilityCriterias[1].CriterionId,
                    Value = 1.6m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[4].TypeId,
                    CriteriaId = sustainabilityCriterias[2].CriterionId,
                    Value = 2.8m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[5].TypeId,
                    CriteriaId = sustainabilityCriterias[0].CriterionId,
                    Value = 1.4m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[5].TypeId,
                    CriteriaId = sustainabilityCriterias[1].CriterionId,
                    Value = 2.1m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[5].TypeId,
                    CriteriaId = sustainabilityCriterias[2].CriterionId,
                    Value = 1.9m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[6].TypeId,
                    CriteriaId = sustainabilityCriterias[0].CriterionId,
                    Value = 2.3m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[6].TypeId,
                    CriteriaId = sustainabilityCriterias[1].CriterionId,
                    Value = 1.5m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[6].TypeId,
                    CriteriaId = sustainabilityCriterias[2].CriterionId,
                    Value = 2.0m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[7].TypeId,
                    CriteriaId = sustainabilityCriterias[0].CriterionId,
                    Value = 1.8m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[7].TypeId,
                    CriteriaId = sustainabilityCriterias[1].CriterionId,
                    Value = 2.4m
                },
                new MaterialTypeBenchmark
                {
                    TypeId = materialTypes[7].TypeId,
                    CriteriaId = sustainabilityCriterias[2].CriterionId,
                    Value = 1.3m
                }
            };

            await context.MaterialTypesBenchmarks.AddRangeAsync(materialTypeBenchmarks);
            await context.SaveChangesAsync();
        }
    }
}
