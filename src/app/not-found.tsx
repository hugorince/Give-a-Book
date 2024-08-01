import { MainLayout } from "@/layout";
import { ImBooks } from "react-icons/im";
import classes from "./not-found.module.css";

const NotFound = () => {
  return (
    <MainLayout>
      <main className={classes.container}>
        <div>
          <ImBooks size={48} color="red" />
          <h1>Not found!</h1>
        </div>
        <p>please go back to the previous url</p>
      </main>
    </MainLayout>
  );
};

export default NotFound;
