module Api
  module V1
    class PlayersController < ApplicationController

      def index
        render json: Player.all
      end

      def create
        @player = Player.new(player_params)
        if @player.save
          render json: @player
        else
          render json: @player.errors, status: :unprocessable_entity
        end
      end

      def login
        player_name = params[:name]
        player = Player.find_by(name: player_name)
        if player
          render json: {message: "success", player: player.name}
        else
          render json: {message: 'error', errorMessage: 'User does not exist.'}
        end
      end


      private

      def player_params
        params.require(:player).permit(:name, :score)
      end

      def delete #only using for backend purposes
        player_name = params[:name]
        @player = Player.find_by(name:player_name)
        @player.destroy
      end
    end
  end
end
