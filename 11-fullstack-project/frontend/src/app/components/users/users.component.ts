/**
 * COMPONENTE USERS (GESTIÓN DE USUARIOS)
 * =======================================
 *
 * Funcionalidad:
 * - Gestiona usuarios de la aplicación (solo visible para administradores)
 * - CRUD completo: crear, listar, editar y eliminar usuarios
 * - Muestra listado de usuarios registrados en el sistema
 *
 * Nota de seguridad:
 * - Este componente está oculto en la navegación para usuarios no admin
 * - Control de acceso mediante @if (currentUser?.role === 'admin') en app.component.html
 * - En producción se recomienda agregar guards en las rutas
 *
 * Operaciones CRUD:
 * - CREATE: Formulario para nuevo usuario (name, email)
 * - READ: Listado completo de usuarios con ID
 * - UPDATE: Edición de datos de usuario existente
 * - DELETE: Eliminación con confirmación
 *
 * Métodos principales:
 * - loadUsers(): Obtiene todos los usuarios desde UserService
 * - openForm(): Abre formulario vacío para crear nuevo usuario
 * - editUser(): Carga usuario en formulario para editar
 * - saveUser(): Crea o actualiza usuario según isEditing
 * - deleteUser(): Elimina usuario tras confirmación
 * - cancelForm(): Cierra formulario y limpia datos
 *
 * Estados:
 * - showForm: Controla visibilidad del formulario
 * - isEditing: Determina si es creación o edición
 * - loading: Estado de carga durante peticiones HTTP
 * - error: Mensaje de error si falla la operación
 *
 * Dependencias:
 * - UserService: API REST para operaciones CRUD sobre /api/users
 * - User model: Interface { id?, name, email, password?, role? }
 * - FormsModule: Para formularios con ngModel (two-way binding)
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: User = { name: '', email: '' };
  showForm = false;
  isEditing = false;
  loading = false;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios: ' + err.message;
        this.loading = false;
      }
    });
  }

  saveUser() {
    if (this.isEditing && this.currentUser.id) {
      this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe({
        next: () => {
          this.loadUsers();
          this.cancelEdit();
        },
        error: (err) => {
          this.error = 'Error al actualizar usuario: ' + err.message;
        }
      });
    } else {
      this.userService.createUser(this.currentUser).subscribe({
        next: () => {
          this.loadUsers();
          this.cancelEdit();
        },
        error: (err) => {
          this.error = 'Error al crear usuario: ' + err.message;
        }
      });
    }
  }

  editUser(user: User) {
    this.currentUser = { ...user };
    this.isEditing = true;
    this.showForm = true;
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          this.error = 'Error al eliminar usuario: ' + err.message;
        }
      });
    }
  }

  cancelEdit() {
    this.currentUser = { name: '', email: '' };
    this.isEditing = false;
    this.showForm = false;
    this.error = '';
  }
}
