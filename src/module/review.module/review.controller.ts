import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReviewEntity } from 'src/db/entities/review.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { Auth } from 'src/utils/auth.decorator';
import { ReviewService } from './review.service';

@Controller('')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @Post('/bike/:bikeId/reviews')
  createReview(
    @Auth() auth,
    @Param('bikeId') bikeId: number,
    @Body() review: ReviewEntity,
  ) {
    return this.reviewService.createReview(review);
  }

  @UseGuards(AuthGuard)
  @Get('/users/:userId/reviews')
  getReview(@Auth() auth, @Param('userId') userId: number) {
    return this.reviewService.getReview(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/bikes/:bikeId/reviews')
  getReviewList(@Auth() auth, @Param('bikeId') bikeId: number) {
    return this.reviewService.getReviewList(bikeId);
  }
}
