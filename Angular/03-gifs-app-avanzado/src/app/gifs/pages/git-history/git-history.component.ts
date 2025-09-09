import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-git-history',
  imports: [],
  templateUrl: './git-history.component.html',

})
export default class GitHistoryComponent {
  gifService = inject(GifService);
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );


}
