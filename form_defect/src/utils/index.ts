
/*
   * 当type=1时获取出生日期,type=2时获取性别,type=3时获取年龄
* */
type cardType = {
    sex: string,
    birthday: string
}
const getIdCardInfo = (IdCard: string): cardType => {
    //获取性别
    let sex = (parseInt(IdCard.substring(16, 1)) % 2 === 1 ? '男' : '女');

    //获取出生日期
    let birthday = IdCard.substring(6, 10) + "-" + IdCard.substring(10, 12) + "-" + IdCard.substring(12, 14);

    return {
        sex,
        birthday
    }
}

export {
    getIdCardInfo
}