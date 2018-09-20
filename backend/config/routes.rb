Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :players
      post '/login', to: "players#login", as: 'login'
      post '/signup', to: "players#create", as: 'signup'
    end
  end
end
