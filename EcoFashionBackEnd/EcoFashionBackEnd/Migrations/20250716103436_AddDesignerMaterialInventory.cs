using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcoFashionBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AddDesignerMaterialInventory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Designer_Material_Inventory",
                columns: table => new
                {
                    DesignerMaterialInventoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DesignerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Designer_Material_Inventory", x => x.DesignerMaterialInventoryId);
                    table.ForeignKey(
                        name: "FK_Designer_Material_Inventory_Designer_DesignerId",
                        column: x => x.DesignerId,
                        principalTable: "Designer",
                        principalColumn: "DesignerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Designer_Material_Inventory_Material_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Material",
                        principalColumn: "MaterialId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Designer_Material_Inventory_DesignerId",
                table: "Designer_Material_Inventory",
                column: "DesignerId");

            migrationBuilder.CreateIndex(
                name: "IX_Designer_Material_Inventory_MaterialId",
                table: "Designer_Material_Inventory",
                column: "MaterialId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Designer_Material_Inventory");
        }
    }
}
