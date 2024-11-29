import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RemoveButtonComponent, TranslateModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  @Input() role: string | null = null;
}
