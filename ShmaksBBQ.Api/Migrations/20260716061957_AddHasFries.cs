using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShmaksBBQ.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddHasFries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasFries",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasFries",
                table: "Products");
        }
    }
}
