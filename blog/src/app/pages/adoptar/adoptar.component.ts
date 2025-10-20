import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Panda {
  id: number;
  name: string;
  age: string;
  gender: string;
  location: string;
  personality: string;
  image: string;
  available: boolean;
  isBaby?: boolean;
  birthDate?: string;
  mother?: string;
  specialNeeds?: string;
}

@Component({
  selector: 'app-adoptar',
  imports: [CommonModule, FormsModule],
  templateUrl: './adoptar.component.html',
  styleUrls: ['./adoptar.component.css']
})
export class AdoptarComponent {

  // Control del modal
  showModal = false;
  currentStep = 1;
  selectedPlan = '';

  // Filtro de pandas
  pandaFilter: 'all' | 'adults' | 'babies' = 'all';

  // Pandas disponibles para adopción
  availablePandas: Panda[] = [
    {
      id: 1,
      name: 'Mei Mei',
      age: '3 años',
      gender: 'Hembra',
      location: 'Centro Chengdu',
      personality: 'Juguetona y curiosa',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80',
      available: true
    },
    {
      id: 2,
      name: 'Bao Bao',
      age: '5 años',
      gender: 'Macho',
      location: 'Centro Chengdu',
      personality: 'Tranquilo y gentil',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Giant_Panda_2004-03-2.jpg',
      available: true
    },
    {
      id: 3,
      name: 'Lin Lin',
      age: '2 años',
      gender: 'Hembra',
      location: 'Centro Wolong',
      personality: 'Energética y traviesa',
      image: 'https://cms.bbcearth.com/sites/default/files/inline-images/panda5.jpg',
      available: true
    },
    {
      id: 4,
      name: 'Ping Ping',
      age: '4 años',
      gender: 'Macho',
      location: 'Centro Bifengxia',
      personality: 'Aventurero y social',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28BVlT17laPBZg3U-JYJ8y0zR4KYY9bef2w&s',
      available: false
    }
  ];

  // Pandas recién nacidos disponibles para adopción
  babyPandas: Panda[] = [
    {
      id: 5,
      name: 'Xiao Bao',
      age: '3 meses',
      gender: 'Macho',
      location: 'Centro Chengdu',
      personality: 'Curioso y dormilón',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvwfBCv89hJLLsXoLmXP0-NrAE9mkX2XqH0Q&s',
      available: true,
      isBaby: true,
      birthDate: '2025-07-15',
      mother: 'Mei Mei',
      specialNeeds: 'Alimentación cada 4 horas, cuidados intensivos de enfermería'
    },
    {
      id: 6,
      name: 'Tiny',
      age: '6 semanas',
      gender: 'Hembra',
      location: 'Centro Wolong',
      personality: 'Muy pequeña y frágil',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE31WhWPmNHL51D-_5P-VuxCkENqkllrofnw&s',
      available: true,
      isBaby: true,
      birthDate: '2025-09-05',
      mother: 'Lin Lin',
      specialNeeds: 'Incubadora, alimentación con biberón cada 2 horas'
    },
    {
      id: 7,
      name: 'Dulce',
      age: '4 meses',
      gender: 'Hembra',
      location: 'Centro Chengdu',
      personality: 'Juguetona y activa',
      image: 'https://www.muralesyvinilos.com/murales/951001_Oso_Panda_Abrazando_a_su_Bebe.jpg',
      available: true,
      isBaby: true,
      birthDate: '2025-06-20',
      mother: 'Desconocida (rescatada)',
      specialNeeds: 'Fisioterapia para desarrollo motor, socialización especial'
    },
    {
      id: 8,
      name: 'Gemelo A',
      age: '2 meses',
      gender: 'Macho',
      location: 'Centro Bifengxia',
      personality: 'Tranquilo, siempre con su hermano',
      image: 'https://www.zoomadrid.com/content/dam/zoo/images/blog/Imagen1.jpg',
      available: true,
      isBaby: true,
      birthDate: '2025-08-20',
      mother: 'Hua Hua',
      specialNeeds: 'Adopción conjunta con Gemelo B preferible'
    },
    {
      id: 9,
      name: 'Gemelo B',
      age: '2 meses',
      gender: 'Hembra',
      location: 'Centro Bifengxia',
      personality: 'Activa, siempre con su hermano',
      image: 'https://www.zoomadrid.com/content/dam/zoo/images/blog/Imagen1.jpg',
      available: true,
      isBaby: true,
      birthDate: '2025-08-20',
      mother: 'Hua Hua',
      specialNeeds: 'Adopción conjunta con Gemelo A preferible'
    }
  ];

  // Combinar pandas adultos y bebés
  get allPandas(): Panda[] {
    return [...this.availablePandas, ...this.babyPandas];
  }

  // Datos del formulario
  adoptionForm = {
    selectedPanda: null as Panda | null,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      address: ''
    },
    paymentInfo: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: ''
    }
  };

  // Abrir modal con plan seleccionado
  openModal(plan: string) {
    this.selectedPlan = plan;
    this.showModal = true;
    this.currentStep = 1;
    document.body.style.overflow = 'hidden'; // Prevenir scroll del fondo
  }

  // Cerrar modal
  closeModal() {
    this.showModal = false;
    this.currentStep = 1;
    this.resetForm();
    document.body.style.overflow = 'auto'; // Restaurar scroll
  }

  // Navegación entre pasos
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Seleccionar panda
  selectPanda(panda: Panda) {
    this.adoptionForm.selectedPanda = panda;
  }

  // Validaciones
  isStep1Valid(): boolean {
    return this.adoptionForm.selectedPanda !== null;
  }

  isStep2Valid(): boolean {
    const info = this.adoptionForm.personalInfo;
    return !!(info.firstName && info.lastName && info.email && info.phone);
  }

  isStep3Valid(): boolean {
    const payment = this.adoptionForm.paymentInfo;
    if (payment.method === 'card') {
      return !!(payment.cardNumber && payment.expiryDate && payment.cvv && payment.cardName);
    }
    return true; // Para otros métodos de pago
  }

  // Procesar adopción
  processAdoption() {
    if (this.isStep3Valid()) {
      // Aquí iría la lógica de procesamiento del pago
      alert('¡Felicidades! Tu adopción ha sido procesada exitosamente. Pronto recibirás un email con todos los detalles.');
      this.closeModal();
    }
  }

  // Resetear formulario
  resetForm() {
    this.adoptionForm = {
      selectedPanda: null as Panda | null,
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        address: ''
      },
      paymentInfo: {
        method: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
      }
    };
  }

  // Obtener precio según el plan
  getPlanPrice(): string {
    switch(this.selectedPlan) {
      case 'basico': return '25€';
      case 'premium': return '50€';
      case 'vip': return '100€';
      default: return '25€';
    }
  }

  // Obtener nombre del plan
  getPlanName(): string {
    switch(this.selectedPlan) {
      case 'basico': return 'Padrino Bambú';
      case 'premium': return 'Padrino Real';
      case 'vip': return 'Padrino VIP';
      default: return 'Padrino Bambú';
    }
  }

  // Filtros de pandas
  setPandaFilter(filter: 'all' | 'adults' | 'babies') {
    this.pandaFilter = filter;
  }

  getFilteredPandas() {
    switch(this.pandaFilter) {
      case 'adults':
        return this.availablePandas;
      case 'babies':
        return this.babyPandas;
      case 'all':
      default:
        return this.allPandas;
    }
  }
}
