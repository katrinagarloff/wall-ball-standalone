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

      private
      def player_params
        params.require(:player).permit(:name)
      end
    end
  end
end
