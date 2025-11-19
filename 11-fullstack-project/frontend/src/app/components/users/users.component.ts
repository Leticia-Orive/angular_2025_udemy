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
