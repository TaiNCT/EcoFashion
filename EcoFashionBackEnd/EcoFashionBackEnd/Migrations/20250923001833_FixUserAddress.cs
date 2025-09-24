using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EcoFashionBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class FixUserAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SenderName",
                table: "UserAddresses",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SenderName",
                table: "UserAddresses");
        }
    }
}
