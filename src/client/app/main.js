import "../components/login";

export default function appMainFunction() {
  const root = document.createElement("div");

  root.innerHTML = `
<ec-login></ec-login>
`;

  document.body.appendChild(root);
}
