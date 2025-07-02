/**
 * Carga un script externo de forma dinámica y devuelve una promesa que se resuelve cuando está listo.
 * 
 * @param {string} src - URL del script externo
 * @param {string} globalVar - Nombre de la variable global que debe estar disponible tras cargar
 * @param {number} [timeout=5000] - Tiempo máximo para esperar (en milisegundos)
 * @returns {Promise<any>}
 */
export function loadExternalScript(src: string, globalVar: string, timeout: number = 5000): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('Debe ejecutarse en el navegador');

    // Si ya está cargado, resolvemos de inmediato
    if ((window as any)[globalVar]) {
      return resolve((window as any)[globalVar]);
    }

    // Revisar si ya hay un script en proceso de carga
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      // Ya existe, esperar a que la variable esté disponible
      waitForGlobalVar(globalVar, timeout).then(resolve).catch(reject);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      waitForGlobalVar(globalVar, timeout).then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error(`Error cargando el script: ${src}`));
    document.head.appendChild(script);
  });
}

function waitForGlobalVar(name: string, timeout: number): Promise<any> {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let waited = 0;
    const check = () => {
      if ((window as any)[name]) {
        resolve((window as any)[name]);
      } else if (waited >= timeout) {
        reject(new Error(`Variable global "${name}" no disponible tras ${timeout}ms.`));
      } else {
        waited += interval;
        setTimeout(check, interval);
      }
    };
    check();
  });
}
