export function validarNombre(input) {
  if (input.value.length >=2 && input.value.length <= 100) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

export function validarDescripcion(input) {
  if (input.value.length >=2 && input.value.length <= 500) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

export function validarCategoria(input) {
  let patron = /^[a-zA-Z\s]{2,25}$/ ;

  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

export function validarDuracion(input) {
  let patron = /^[A-Za-z0-9\s]+$/;

  if ((patron.test(input.value)) && input.value.length >=1 && input.value.length <= 5) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

export function validarClasificacion(input) {
  let patron = /^[a-z0-9-]+$/
  if (patron.test(input.values) && input.value.length >=1 && input.value.length <= 5) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

export function validarPortada(input) {
  let patron = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true
  } else {
    input.className = "form-control is-invalid";
    return false
  }
}

export function validarDireccion(input) {
  let patron = /^[a-zA-Z\s]{2,25}$/ ;

  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

export function validarActores(input) {
  let patron = /^[a-zA-Z,\s]{2,25}$/ ;

  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

export function validarAno(input) {
  let patron = /^(19[8-9][0-9]|20[0-2][0-2])$/ ;

  if (patron.test(input.value)) {
    input.className = 'form-control is-valid';
    return true
  }else{
    input.className = 'form-control is-invalid';
    return false
  }
}

