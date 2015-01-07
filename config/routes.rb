IconArray::Application.routes.draw do
  resources :risks do
    member do
      post 'remove'
    end
  end

  resources :icons

  resources :pictographs do
    collection do
      get 'view'
      get 'embed'
    end
  end
  
  match '/about' => 'contents#about', :as => :about
  match '/why' => 'contents#why', :as => :why
  match '/examples' => 'contents#examples', :as => :examples
  match '/sponsorship' => 'contents#sponsorship', :as => :sponsorship
  match '/citation' => 'contents#citation', :as => :citation
  match '/advanced' => 'pictographs#new', :advanced => true, :as => :advanced
  match '/reset' => 'pictographs#new', :reset => true, :as => :reset

  root :to => 'pictographs#new'

  match ':action' => 'contents#:action'
end
