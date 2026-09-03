import { alertas, formatMoney, proyectos, totalPresupuesto, transferencias } from "../data/mock";

export async function preguntarAsistente({ data }) {
  const pregunta = data.pregunta.toLowerCase();
  if (pregunta.includes("alerta")) {
    return { respuesta: `Hay ${alertas.length} alertas activas en el panel.` };
  }
  if (pregunta.includes("transfer")) {
    return { respuesta: `Hay ${transferencias.filter((item) => item.estado === "Lista para transferir").length} transferencias listas para transferir.` };
  }
  if (pregunta.includes("ejecuci")) {
    return { respuesta: `${proyectos.filter((item) => item.estado === "En ejecución").length} proyectos están actualmente en ejecución.` };
  }
  if (pregunta.includes("presupuesto") || pregunta.includes("ejecut")) {
    const total = proyectos.reduce((acc, proyecto) => {
      const presupuesto = totalPresupuesto(proyecto);
      return acc + presupuesto.ejecutado;
    }, 0);
    return { respuesta: `El presupuesto ejecutado registrado es ${formatMoney(total)}.` };
  }
  return { respuesta: "Puedo consultar proyectos, presupuesto, alertas y transferencias del panel." };
}
