import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Role } from 'src/app/models/role-model';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RemoveButtonComponent, TranslateModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  @Input() role?: Role | null = null;
}
