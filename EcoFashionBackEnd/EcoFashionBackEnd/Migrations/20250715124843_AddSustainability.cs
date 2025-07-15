using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcoFashionBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AddSustainability : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materials_MaterialType_TypeId",
                table: "Materials");

            migrationBuilder.DropForeignKey(
                name: "FK_Materials_Supplier_SupplierId",
                table: "Materials");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Materials",
                table: "Materials");

            migrationBuilder.RenameTable(
                name: "Materials",
                newName: "Material");

            migrationBuilder.RenameIndex(
                name: "IX_Materials_TypeId",
                table: "Material",
                newName: "IX_Material_TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Materials_SupplierId",
                table: "Material",
                newName: "IX_Material_SupplierId");

            migrationBuilder.AlterColumn<decimal>(
                name: "SustainabilityScore",
                table: "Material",
                type: "decimal(5,2)",
                precision: 5,
                scale: 2,
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "RecycledPercentage",
                table: "Material",
                type: "decimal(5,2)",
                precision: 5,
                scale: 2,
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Material",
                table: "Material",
                column: "MaterialId");

            migrationBuilder.CreateTable(
                name: "Design_Draft",
                columns: table => new
                {
                    DesignDraftId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DesignerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecycledPercentage = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Design_Draft", x => x.DesignDraftId);
                    table.ForeignKey(
                        name: "FK_Design_Draft_Designer_DesignerId",
                        column: x => x.DesignerId,
                        principalTable: "Designer",
                        principalColumn: "DesignerId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    ImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.ImageId);
                });

            migrationBuilder.CreateTable(
                name: "Saved_Material",
                columns: table => new
                {
                    SavedMaterialId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DesignerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saved_Material", x => x.SavedMaterialId);
                    table.ForeignKey(
                        name: "FK_Saved_Material_Designer_DesignerId",
                        column: x => x.DesignerId,
                        principalTable: "Designer",
                        principalColumn: "DesignerId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Saved_Material_Material_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Material",
                        principalColumn: "MaterialId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sustainability_Criteria",
                columns: table => new
                {
                    SustainabilityCriteriaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CriteriaName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Unit = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sustainability_Criteria", x => x.SustainabilityCriteriaId);
                });

            migrationBuilder.CreateTable(
                name: "Draft_Material",
                columns: table => new
                {
                    DesignDraftId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    PercentageUsed = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Draft_Material", x => new { x.DesignDraftId, x.MaterialId });
                    table.ForeignKey(
                        name: "FK_Draft_Material_Design_Draft_DesignDraftId",
                        column: x => x.DesignDraftId,
                        principalTable: "Design_Draft",
                        principalColumn: "DesignDraftId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Draft_Material_Material_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Material",
                        principalColumn: "MaterialId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Material_Image",
                columns: table => new
                {
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    ImageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Material_Image", x => new { x.MaterialId, x.ImageId });
                    table.ForeignKey(
                        name: "FK_Material_Image_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "ImageId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Material_Image_Material_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Material",
                        principalColumn: "MaterialId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Material_Sustainability",
                columns: table => new
                {
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    SustainabilityCriteriaId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Material_Sustainability", x => new { x.MaterialId, x.SustainabilityCriteriaId });
                    table.ForeignKey(
                        name: "FK_Material_Sustainability_Material_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Material",
                        principalColumn: "MaterialId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Material_Sustainability_Sustainability_Criteria_SustainabilityCriteriaId",
                        column: x => x.SustainabilityCriteriaId,
                        principalTable: "Sustainability_Criteria",
                        principalColumn: "SustainabilityCriteriaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Design_Draft_DesignerId",
                table: "Design_Draft",
                column: "DesignerId");

            migrationBuilder.CreateIndex(
                name: "IX_Draft_Material_MaterialId",
                table: "Draft_Material",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_Material_Image_ImageId",
                table: "Material_Image",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Material_Sustainability_SustainabilityCriteriaId",
                table: "Material_Sustainability",
                column: "SustainabilityCriteriaId");

            migrationBuilder.CreateIndex(
                name: "IX_Saved_Material_DesignerId",
                table: "Saved_Material",
                column: "DesignerId");

            migrationBuilder.CreateIndex(
                name: "IX_Saved_Material_MaterialId",
                table: "Saved_Material",
                column: "MaterialId");

            migrationBuilder.AddForeignKey(
                name: "FK_Material_MaterialType_TypeId",
                table: "Material",
                column: "TypeId",
                principalTable: "MaterialType",
                principalColumn: "TypeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Material_Supplier_SupplierId",
                table: "Material",
                column: "SupplierId",
                principalTable: "Supplier",
                principalColumn: "SupplierId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Material_MaterialType_TypeId",
                table: "Material");

            migrationBuilder.DropForeignKey(
                name: "FK_Material_Supplier_SupplierId",
                table: "Material");

            migrationBuilder.DropTable(
                name: "Draft_Material");

            migrationBuilder.DropTable(
                name: "Material_Image");

            migrationBuilder.DropTable(
                name: "Material_Sustainability");

            migrationBuilder.DropTable(
                name: "Saved_Material");

            migrationBuilder.DropTable(
                name: "Design_Draft");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "Sustainability_Criteria");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Material",
                table: "Material");

            migrationBuilder.RenameTable(
                name: "Material",
                newName: "Materials");

            migrationBuilder.RenameIndex(
                name: "IX_Material_TypeId",
                table: "Materials",
                newName: "IX_Materials_TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Material_SupplierId",
                table: "Materials",
                newName: "IX_Materials_SupplierId");

            migrationBuilder.AlterColumn<double>(
                name: "SustainabilityScore",
                table: "Materials",
                type: "float",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,2)",
                oldPrecision: 5,
                oldScale: 2,
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "RecycledPercentage",
                table: "Materials",
                type: "float",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(5,2)",
                oldPrecision: 5,
                oldScale: 2,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Materials",
                table: "Materials",
                column: "MaterialId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_MaterialType_TypeId",
                table: "Materials",
                column: "TypeId",
                principalTable: "MaterialType",
                principalColumn: "TypeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_Supplier_SupplierId",
                table: "Materials",
                column: "SupplierId",
                principalTable: "Supplier",
                principalColumn: "SupplierId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
