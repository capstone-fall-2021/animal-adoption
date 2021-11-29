import { RegistrationForm } from "./";

export default function NewUserLanding() {
  return (
    <div>
      <h1>About</h1>
      <p>
        This website is for people looking for animal companionship. Animal
        profiles are created in a way that is similar to how they would on a
        dating site. Different animals are better suited to different people,
        and even amongst the same species, there are personality differences
        that can be important when it comes to compatibility. This site hopes to
        provide a place where you can be informed about the personality of each
        animal before making a decision to adopt them.
      </p>

      <h1>Sign up today!</h1>
      <RegistrationForm />
    </div>
  );
}