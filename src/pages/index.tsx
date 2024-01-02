import HomeContent from "../components/home/HomeContent";
import Layout from "../components/layout";
import LoginLayout from "../components/layout/LoginLayout";
import Registration from "../features/auth/registration";
const isAuth = false;
export default function Home() {
  if (isAuth) {
    return (
      <LoginLayout>
        <Registration />
      </LoginLayout>
    );
  }
  return (
    <Layout>
      <HomeContent />
    </Layout>
  );
}
