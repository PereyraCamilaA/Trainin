import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicio } from '../../core/modelos/Ejercicio';
import { AdminService } from '../../core/servicios/adminServicio/admin.service';
declare var bootstrap: any;

@Component({
  selector: 'app-inicio-admin',
  standalone: false,
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.css',
})
export class InicioAdminComponent {
  ejercicios: Ejercicio[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerEjercicios();
  }

  obtenerEjercicios(): void {
    this.adminService.obtenerEjercicios().subscribe({
      next: (ejerciciosObtenidos: Ejercicio[]) => {
        this.ejercicios = ejerciciosObtenidos;
      },
      error: (err: any) => {
        console.error('Error al obtener los ejercicios:', err);
      },
      complete: () => {
        console.log('Petición completada');
      },
    });
  }

  editarEjercicio(id: number): void {
    this.router.navigate(['/editar-ejercicio', id]);
  }

  abrirModalEliminarEjercicio() {
    const modal = new bootstrap.Modal(document.getElementById('bootstrapModal'));
    modal.show();
  }

  eliminarEjercicio(id: number): void {
    this.adminService.eliminarEjercicio(id).subscribe({
      next: (fueEliminado: boolean) => {
        if (fueEliminado) {
          this.ejercicios =
            this.ejercicios?.filter((ejercicio) => ejercicio.id !== id) || [];
          console.log('✅ Ejercicio eliminado con éxito');
        } else {
          console.error('❌ No se pudo eliminar el ejercicio');
        }
      },
      error: (err: any) => {
        console.error('❌ Error al eliminar el ejercicio:', err);
      },
      complete: () => {
        console.log('ℹ️ Petición de eliminación completada');
      },
    });
  }
}
