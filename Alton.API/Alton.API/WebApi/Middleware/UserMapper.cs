namespace Alton.API.Middlwares
{
    public class UserMapper
    {
        public static string[] MapRole(string roleId)
        {
            string[] result = new string[2];
            switch (roleId)
            {
                case "1":
                    result[0] = "Admin";
                    result[1] = "QE5#AGj@@UV+!Ad2@!msuv6!";
                    break;
                case "3":
                    result[0] = "User";
                    result[1] = "M)tCXD%Y@uEQTj*@FLmuD)P$";
                    break;
            }
            return result;
        }
    }
}
