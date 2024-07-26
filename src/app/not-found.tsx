import classes from "./not-found.module.css";
import { ImBooks } from "react-icons/im";

const NotFound = () => {
  return (
    <main className={classes.container}>
      <div>
        <ImBooks size={48} color="red" />
        <h1>Not found!</h1>
      </div>
      <p>please go back to the previous url</p>
    </main>
  );
};

export default NotFound;
