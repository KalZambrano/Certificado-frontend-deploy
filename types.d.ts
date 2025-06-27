export interface CertificateAPI {
    id:                 number;
    nombreEstudiante:   string;
    curso:              string;
    nota:               number;
    fechaEmision:       Date;
    codigoVerificacion: string;
    habilidades:        string[];
    descripcion:        string;
}

export interface UserAPI {
    id:       number;
    nombre:   string;
    apellido: string;
    correo:   string;
    clave:    string;
    rol:      string;
}