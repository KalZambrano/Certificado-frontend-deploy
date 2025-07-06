// Type para la api de conseguir todos los certificados
export interface CertificatesAPI {
    id:                 number;
    nombreCompleto:   string;
    curso:              string;
    nota:               number;
    fechaEmision:       Date;
    codigoVerificacion: string;
    habilidades:        string[];
    descripcion:        string;
}

// Type para api de conseguir todos los usuarios
export interface UserAPI {
    id:       number;
    nombre:   string;
    apellido: string;
    correo:   string;
    clave:    string;
    rol:      string;
}

// Type para api que regresa solo los de rol "USER"
export interface OnlyUsersAPI {
    id:       number;
    nombre:   string;
    apellido: string;
    correo:   string;
}

// Type para los certificados del estudiante (encontrados por email)
export interface StudentCertificatesAPI {
    nombreCompleto: string;
    curso:          string;
    nota:           number;
    descripcion:    string;
    habilidades:    string[];
    fechaEmision:   Date;
}

// Para cuando se consigue un unico certificado - Pagina dinamica
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

export type Estudiante = {
    id:       number;
    nombre:   string;
    apellido: string;
    correo:   string;
    clave:    string;
    rol:      string;
}