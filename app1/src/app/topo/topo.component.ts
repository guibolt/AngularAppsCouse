import { Component} from '@angular/core'

@Component({
    selector: 'app-topo',
    // class => selector:'.app-topo'
    // prop => selector:'[app-topo]'
    templateUrl: './topo.component.html',
    styleUrls:['./topo.component.css']
})
export class TopoComponent {
public titulo: string = 'App para aprender inglês!'
}