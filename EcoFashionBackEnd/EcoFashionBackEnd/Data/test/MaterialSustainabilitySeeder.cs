using EcoFashionBackEnd.Entities;
using Microsoft.EntityFrameworkCore;

namespace EcoFashionBackEnd.Data.test
{
    public static class MaterialSustainabilitySeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.MaterialSustainabilities.AnyAsync()) return;

            var materials = await context.Materials.ToListAsync();
            var criterias = await context.SustainabilityCriterias.ToListAsync(); 
            if (materials.Count < 3 || criterias.Count < 3)
            {
                throw new Exception($"Seed error: Need at least 3 materials and 3 criteria. Found {materials.Count} materials and {criterias.Count} criterias.");
            }

            var materialSustainabilities = new List<MaterialSustainability>
        {
            new MaterialSustainability { MaterialId = materials[0].MaterialId, CriterionId = criterias[0].CriterionId, Value = 1.2f },
            new MaterialSustainability { MaterialId = materials[0].MaterialId, CriterionId = criterias[1].CriterionId, Value = 2.3f },
            new MaterialSustainability { MaterialId = materials[0].MaterialId, CriterionId = criterias[2].CriterionId, Value = 1.5f },

            new MaterialSustainability { MaterialId = materials[1].MaterialId, CriterionId = criterias[0].CriterionId, Value = 2.2f },
            new MaterialSustainability { MaterialId = materials[1].MaterialId, CriterionId = criterias[1].CriterionId, Value = 1.8f },
            new MaterialSustainability { MaterialId = materials[1].MaterialId, CriterionId = criterias[2].CriterionId, Value = 2.9f },

            new MaterialSustainability { MaterialId = materials[2].MaterialId, CriterionId = criterias[0].CriterionId, Value = 2.1f },
            new MaterialSustainability { MaterialId = materials[2].MaterialId, CriterionId = criterias[1].CriterionId, Value = 3.2f },
            new MaterialSustainability { MaterialId = materials[2].MaterialId, CriterionId = criterias[2].CriterionId, Value = 1.1f }
        };

            await context.MaterialSustainabilities.AddRangeAsync(materialSustainabilities);
            await context.SaveChangesAsync();
        }
    }


}
