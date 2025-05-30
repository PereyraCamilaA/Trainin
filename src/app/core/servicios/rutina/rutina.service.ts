import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutina } from '../../modelos/RutinaDTO';
import { HttpClient } from '@angular/common/http';
import { Ejercicio } from '../../modelos/RutinaDTO';


@Injectable({
  providedIn: 'root',
})
export class RutinaService {
  private rutina: Rutina | null = null;
  private indiceActual: number = 0;

  constructor(private http: HttpClient) {}

  getDetalleEjercicios(planId: number): Observable<Rutina> {
    return this.http.get<Rutina>(
      `http://localhost:5010/api/rutina/obtenerPorPlan/${planId}`
    );
  }

  fueRealizada(idRutina: number, email: string): Observable<any> {
    return this.http.patch<any>(
      `http://localhost:5010/api/rutina/fueRealizada/${idRutina}`,
      { email }
    );
  }

  setRutina(rutinaObtenida: Rutina) {
    this.rutina = rutinaObtenida;
  }

  getRutina(): Rutina | null {
    return this.rutina;
  }

  limpiarRutina() {
    this.rutina = null;
    this.indiceActual = 0;
  }
  setIndiceActual(i: number) {
    this.indiceActual = i;
  }
  
  getIndiceActual(): number {
    return this.indiceActual;
  }
  avanzarAlSiguienteEjercicio(): void {
  if (this.rutina && this.indiceActual < this.rutina.ejercicios.length) {
    this.indiceActual++;
  }
}
  getEjercicioActual(): Ejercicio | null {
    if(!this.rutina || this.indiceActual >= this.rutina.ejercicios.length) {
      return null; 
    }
    return this.rutina.ejercicios[this.indiceActual];
  }

  haySiguienteEjercicio(): boolean {
    return this.indiceActual < this.rutina?.ejercicios.length!;
  }

  getDatosIniciales() {
  const rutina = this.getRutina();
  const indice = this.getIndiceActual();
  const ejercicios = rutina?.ejercicios || [];
  const ejercicio = ejercicios[indice] ?? null;

  const duracion = ejercicio?.duracion ? `${ejercicio.duracion} segundos` : '';
  const repeticiones = ejercicio?.repeticiones ? `${ejercicio.repeticiones} repeticiones` : '';

  return {
    rutina,
    indiceActual: indice,
    ejercicios,
    ejercicio,
    duracionDelEjercicio: duracion,
    repeticionesDelEjercicio: repeticiones,
    correccionPremium: ejercicio?.correccionPremium,
  };
  }
}