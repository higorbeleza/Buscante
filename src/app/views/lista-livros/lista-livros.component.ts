import { Item, Livro, } from './../../models/interfaces';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) { }

  // Observer
  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        console.log('requisição ao servidor..');
        this.listaLivros = this.livrosResultadoParaLivros(items);
      },
      error: erro => console.error(erro)
    });
  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe !
  }
}
