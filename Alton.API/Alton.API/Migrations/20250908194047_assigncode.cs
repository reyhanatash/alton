using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Alton.API.Migrations
{
    /// <inheritdoc />
    public partial class assigncode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserAssignments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "GeneratedCode",
                table: "Codes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserAssignments");

            migrationBuilder.DropColumn(
                name: "GeneratedCode",
                table: "Codes");
        }
    }
}
