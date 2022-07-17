import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerificationUserComponent } from './verification-user/verification-user.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CompareComponent } from './compare/compare.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TypographyComponent } from './typography/typography.component';
import { FaqComponent } from './faq/faq.component';
// Portfolio Page
import { GridTwoColComponent } from './portfolio/grid-two-col/grid-two-col.component';
import { GridThreeColComponent } from './portfolio/grid-three-col/grid-three-col.component';
import { GridFourColComponent } from './portfolio/grid-four-col/grid-four-col.component';
import { MasonaryTwoGridComponent } from './portfolio/masonary-two-grid/masonary-two-grid.component';
import { MasonaryThreeGridComponent } from './portfolio/masonary-three-grid/masonary-three-grid.component';
import { MasonaryFourGridComponent } from './portfolio/masonary-four-grid/masonary-four-grid.component';
import { MasonaryFullwidthComponent } from './portfolio/masonary-fullwidth/masonary-fullwidth.component';
import { PoliticsComponent } from './politics/politics.component';
import { PrivacityComponent } from './privacity/privacity.component';
import { SizeComponent } from './size/size.component';
import { HowWorkComponent } from './how-work/how-work.component';
import { PasswordComponent } from './password/password.component';
import { PoliticsSaleComponent } from './politics-sale/politics-sale.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sobre-nosotros',
        component: AboutUsComponent
      },
      {
        path: 'como-funciona',
        component: HowWorkComponent
      },
      {
        path: '404',
        component: ErrorPageComponent
      },
      {
        path: 'lookbook',
        component: LookbookComponent
      },
      {
        path: 'iniciar-sesion',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegisterComponent
      },
      {
        path: 'verificacion-cuenta/:token',
        component: VerificationUserComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'collection',
        component: CollectionComponent
      },
      {
        path: 'olvido-contrasena',
        component: ForgetPasswordComponent
      },
      {
        path: 'reset-password',
        component: PasswordComponent
      },
      {
        path: 'contacto',
        component: ContactComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'compare',
        component: CompareComponent
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'typography',
        component: TypographyComponent
      },
      {
        path: 'preguntas-frecuentes',
        component: FaqComponent
      },
      {
        path: 'politicas-de-renta',
        component: PoliticsComponent
      },
      {
        path: 'politicas-de-compra',
        component: PoliticsSaleComponent
      },
      {
        path: 'terminos-y-condiciones',
        component: TermsComponent
      },
      {
        path: 'aviso-de-privacidad',
        component: PrivacityComponent
      },
      {
        path: 'que-talla-soy',
        component: SizeComponent
      },
      {
        path: 'grid/two/column',
        component: GridTwoColComponent
      },
      {
        path: 'grid/three/column',
        component: GridThreeColComponent
      },
      {
        path: 'grid/four/column',
        component: GridFourColComponent
      },
      {
        path: 'grid/two/masonary',
        component: MasonaryTwoGridComponent
      },
      {
        path: 'grid/three/masonary',
        component: MasonaryThreeGridComponent
      },
      {
        path: 'grid/four/masonary',
        component: MasonaryFourGridComponent
      },
      {
        path: 'fullwidth/masonary',
        component: MasonaryFullwidthComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
