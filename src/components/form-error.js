export default function FormError({ error }) {
  if (typeof error === "undefined" || error === null) {
    return null;
  }

  return <span>{error.message}</span>;
}
