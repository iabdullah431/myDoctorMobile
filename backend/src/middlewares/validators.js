export const SaveUser = (req,res)=>{
    req.checkBody('name')
    .notEmpty()
    .withMessage('الإسم مطلوب');
    
    req.checkBody('email')
    .notEmpty()
    .withMessage(' البريد الإلكتروني مطلوب');
    req.checkBody('email')
    .notEmpty()
    .withMessage(' صيغة البريد الإلكتروني غير صحيحة');

    req.checkBody('password')
    .notEmpty()
    .withMessage('كلمة المرور مطلوبه');

    req.checkBody('userType')
    .notEmpty()
    .withMessage('نوع المستخدم مطلوب');
};