export interface CertificatesAPI {
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

export interface OnlyUsersAPI {
    id:       number;
    nombre:   string;
    apellido: string;
    correo:   string;
}

export interface StudentCertificatesAPI {
    nombreCompleto: string;
    curso:          string;
    nota:           number;
    descripcion:    string;
    habilidades:    string[];
    fechaEmision:   Date;
}

// Para cuando se consigue un unico certificado
export interface CertificateUniqueAPI {
    id:                 number;
    curso:              string;
    nota:               number;
    fechaEmision:       Date;
    codigoVerificacion: string;
    habilidades:        string[];
    descripcion:        string;
    estudiante:         Estudiante;
}

type Estudiante = {
    id:       number;
    nombre:   string;
    apellido: string;
    correo:   string;
    clave:    string;
    rol:      string;
}