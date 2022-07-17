import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { IsotopeModule } from 'ngx-isotope';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PasswordComponent } from './password/password.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CompareComponent } from './compare/compare.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { TypographyComponent } from './typography/typography.component';
import { GridTwoColComponent } from './portfolio/grid-two-col/grid-two-col.component';
import { GridThreeColComponent } from './portfolio/grid-three-col/grid-three-col.component';
import { GridFourColComponent } from './portfolio/grid-four-col/grid-four-col.component';
import { MasonaryTwoGridComponent } from './portfolio/masonary-two-grid/masonary-two-grid.component';
import { MasonaryThreeGridComponent } from './portfolio/masonary-three-grid/masonary-three-grid.component';
import { MasonaryFourGridComponent } from './portfolio/masonary-four-grid/masonary-four-grid.component';
import { MasonaryFullwidthComponent } from './portfolio/masonary-fullwidth/masonary-fullwidth.component';
import { VerificationUserComponent } from './verification-user/verification-user.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { PoliticsComponent } from './politics/politics.component';
import { PrivacityComponent } from './privacity/privacity.component';
import { SizeComponent } from './size/size.component';
import { HowWorkComponent } from './how-work/how-work.component';
import { PoliticsSaleComponent } from './politics-sale/politics-sale.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SlickCarouselModule,
    // IsotopeModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
    AboutUsComponent,
    HowWorkComponent,
    ErrorPageComponent,
    LookbookComponent,
    LoginComponent,
    RegisterComponent,
    VerificationUserComponent,
    SearchComponent,
    WishlistComponent,
    CartComponent,
    CollectionComponent,
    ForgetPasswordComponent,
    PasswordComponent,
    ContactComponent,
    CheckoutComponent,
    CompareComponent,
    OrderSuccessComponent,
    DashboardComponent,
    FaqComponent,
    PoliticsComponent,
    TermsComponent,
    PoliticsSaleComponent,
    PrivacityComponent,
    SizeComponent,
    TypographyComponent,
    GridTwoColComponent,
    GridThreeColComponent,
    GridFourColComponent,
    MasonaryTwoGridComponent,
    MasonaryThreeGridComponent,
    MasonaryFourGridComponent,
    MasonaryFullwidthComponent
  ]
})
export class PagesModule { }
