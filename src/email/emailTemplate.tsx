interface EmailTemplateProps {
    email: string;
    username: string;
    verifyCode: number;
}
function EmailTemplate({
    email,
    username,
    verifyCode,
}: EmailTemplateProps) {
    return (
        <div>
        <h1>Welcome, { username }! </h1>
        < p > Your verification code is: { verifyCode } </p>
            </div>
  );
}
export default EmailTemplate;