import AccessEnum from "@/access/accessEnum";

/**
 * 检验用户权限
 * @param loginUser
 * @param needAccess
 */
const checkAccess = (loginUser: API.LoginUserVO, needAccess = AccessEnum.NOT_LOGIN) => {
    const userAccess = loginUser.userRole;
    if (needAccess === AccessEnum.NOT_LOGIN) {
        return true;
    }
    if (needAccess === AccessEnum.USER) {
        return userAccess === AccessEnum.USER || userAccess === AccessEnum.ADMIN;
    }
    if (needAccess === AccessEnum.ADMIN) {
        return userAccess === AccessEnum.ADMIN;
    }
}

export default checkAccess;
