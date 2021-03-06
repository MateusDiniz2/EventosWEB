// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/Evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventosFiltrados : any = [];
  public eventos: any = [];
  margemImagem: number = 2;
  larguraImagem: number = 150;
  exibirImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string) : any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento:any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== - 1
    )
  }

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.getEventos();
  }

  public getEventos(): void {
    this.eventoService.getEvento().subscribe(
      response => {
        this.eventos = response,
        this.eventosFiltrados = this.eventos;
      },
        error => console.log(error)
    );
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }
}
