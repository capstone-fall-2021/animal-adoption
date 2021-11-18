export default function ErrorList({ errors }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <ul>
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}
